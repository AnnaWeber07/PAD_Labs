using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClimateController : ControllerBase
    {
        private readonly IMemoryCache _cache;

        public ClimateController(IMemoryCache cache)
        {
            _cache = cache;
        }

        [HttpGet("/combined/status")]
        public IActionResult GetCombinedStatus()
        {
            try
            {
                // Generate climate data
                var climateData = GenerateClimateData();

                // Generate sensor data
                var sensorData = GenerateSensorData();

                var combinedData = new
                {
                    ClimateData = climateData,
                    SensorData = sensorData
                };

                return Ok(combinedData);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        private object GenerateClimateData()
        {
            var timestamp = DateTime.UtcNow;
            var temperature = GenerateRandomDouble(20, 30);
            var humidity = GenerateRandomDouble(50, 70);

            return new
            {
                timestamp,
                temperature,
                humidity,
                Status = "Normal"
            };
        }

        private object GenerateSensorData()
        {
            var sensorId = "12345";
            var timestamp = DateTime.UtcNow;
            var statusOptions = new[] { "Operational", "Needs Maintenance" };
            var batteryLevel = GenerateRandomInt(70, 100);

            return new
            {
                sensor_id = sensorId,
                timestamp,
                status = statusOptions[GenerateRandomInt(0, statusOptions.Length)],
                battery_level = batteryLevel
            };
        }

        private double GenerateRandomDouble(double min, double max)
        {
            var random = new Random();
            return min + (random.NextDouble() * (max - min));
        }

        private int GenerateRandomInt(int min, int max)
        {
            var random = new Random();
            return random.Next(min, max);
        }
    }
}
