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

        [HttpGet("/climate/status")]
        public IActionResult GetClimateStatus()
        {
            var timestamp = DateTime.UtcNow;
            var temperature = GenerateRandomDouble(20, 30); // Generate random temperature (between 20 and 30)
            var humidity = GenerateRandomDouble(50, 70); // Generate random humidity (between 50 and 70)

            var status = new
            {
                timestamp,
                temperature,
                humidity,
                Status = "Normal"
            };

            return Ok(status);
        }

        [HttpGet("sensors/status")]
        public IActionResult GetSensorStatus()
        {
            var sensorId = "12345"; // Simulated sensor ID
            var timestamp = DateTime.UtcNow;
            var statusOptions = new[] { "Operational", "Needs Maintenance" }; // Simulated status options
            var batteryLevel = GenerateRandomInt(70, 100); // Generate random battery level (between 70 and 100)

            var status = new
            {
                sensor_id = sensorId,
                timestamp,
                status = statusOptions[GenerateRandomInt(0, statusOptions.Length)],
                battery_level = batteryLevel
            };

            return Ok(status);
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
