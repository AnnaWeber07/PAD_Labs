using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using CCS.Data;

namespace CCS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClimateController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMemoryCache _cache;
        private static SemaphoreSlim _semaphoreSlim = new SemaphoreSlim(5);

        public ClimateController(DataContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateClimateData([FromBody] ClimateModel climateData)
        {
            try
            {
                await _semaphoreSlim.WaitAsync();

                _context.ClimateData.Add(climateData);
                await _context.SaveChangesAsync();

                // Clear cache after an update
                _cache.Remove("LatestClimateData");

                return Ok();
            }
            finally
            {
                _semaphoreSlim.Release();
            }
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetClimateStatus()
        {
            if (_cache.TryGetValue("LatestClimateData", out ClimateModel latestClimateData))
            {
                var status = new
                {
                    latestClimateData.Timestamp,
                    latestClimateData.Temperature,
                    latestClimateData.Humidity,
                    Status = "Normal"
                };

                return Ok("active");
            }

            var cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TimeSpan.FromSeconds(5));

            try
            {
                await _semaphoreSlim.WaitAsync();
                latestClimateData = await _context.ClimateData
                    .OrderByDescending(cd => cd.Timestamp)
                    .FirstOrDefaultAsync(cancellationTokenSource.Token);

                if (latestClimateData == null)
                {
                    return NotFound("Climate data not found.");
                }

                _cache.Set("LatestClimateData", latestClimateData, TimeSpan.FromMinutes(10));

                var status = new
                {
                    latestClimateData.Timestamp,
                    latestClimateData.Temperature,
                    latestClimateData.Humidity,
                    Status = "Normal"
                };

                return Ok("active");
            }
            catch (OperationCanceledException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Operation timed out.");
            }
            finally
            {
                _semaphoreSlim.Release();
            }
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetHistoricalClimateData([FromQuery] DateTime start_date, [FromQuery] DateTime end_date)
        {
            var cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TimeSpan.FromSeconds(5));

            try
            {
                await _semaphoreSlim.WaitAsync();
                var historicalData = await _context.ClimateData
                    .Where(cd => cd.Timestamp >= start_date && cd.Timestamp <= end_date)
                    .ToListAsync(cancellationTokenSource.Token);

                return Ok(historicalData);
            }
            catch (OperationCanceledException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Operation timed out.");
            }
            finally
            {
                _semaphoreSlim.Release();
            }
        }
    }
}
