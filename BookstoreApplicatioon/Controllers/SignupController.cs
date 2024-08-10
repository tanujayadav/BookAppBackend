using BookstoreApplicatioon.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BookstoreApplicatioon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        private readonly BookstoreDBContext _context;
        public SignupController(BookstoreDBContext context)
        {
            _context = context;
        }

        [HttpGet("GetSignup")]
        public ActionResult<List<User>> GetSignup()
        {
            List<User> signup = _context.Users.ToList();
            return Ok(signup);
        }

        [HttpPost]
        public IActionResult Post([FromBody] User signup)
        {
            try
            {
                var existingUser = _context.Users.FirstOrDefault(u => u.Email == signup.Email);
                if (existingUser != null)
                {
                    return BadRequest("Email is already registered. Please login.");
                }

                _context.Users.Add(signup);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetSignup), new { id = signup.UserId }, signup);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Signup failed. Please try again later.");
            }
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                User signup = _context.Users.Find(id);
                if (signup == null)
                {
                    return NotFound("Record not found.");
                }

                _context.Users.Remove(signup);
                _context.SaveChanges();

                return Ok("Record deleted successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Deletion error. Please try again later.");
            }
        }

        [HttpPut("Update/{id}")]
        public IActionResult Update(int id, [FromBody] User updatedSignup)
        {
            try
            {
                var signup = _context.Users.Find(id);
                if (signup == null)
                {
                    return NotFound("Record not found.");
                }

                signup.Username = updatedSignup.Username;
                signup.Password = updatedSignup.Password;
                signup.Email = updatedSignup.Email;
                signup.Address = updatedSignup.Address;
                signup.PhoneNo = updatedSignup.PhoneNo;

                _context.SaveChanges();

                return Ok("Record updated successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Update error. Please try again later.");
            }
        }

        [HttpGet("GetSignupIdByEmail")]
        public IActionResult GetSignupIdByEmail([FromQuery] string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user != null)
            {
                return Ok(user.UserId);
            }
            else
            {
                return NotFound("User not found.");
            }
        }
    }
}
