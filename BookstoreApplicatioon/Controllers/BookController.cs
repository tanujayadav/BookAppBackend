using BookstoreApplicatioon.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreApplicatioon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookstoreDBContext _context;
        public BookController(  BookstoreDBContext context)
        {
            _context = context;


        }

        [HttpGet("GetBooks")]
        public List<Book> GetGases()
        {

            List<Book> books = _context.Books.ToList();


            return books;


        }

        [HttpPost]
        public IActionResult Post([FromBody] Book books)
        {

            try
            {

                /*if (existingUser != null)
                {
                    return BadRequest("Email is already registered. Please login.");

                }*/
                _context.Books.Add(books);
                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
            return Created("books Added", "books Added");



        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                // Find the entity by id
                Book books = _context.Books.Find(id);
                if (books == null)
                {
                    return NotFound("Record not found.");
                }

                // Remove the entity from the context
                _context.Books.Remove(books);

                // Save changes to the database
                _context.SaveChanges();

                return Ok("Record deleted successfully.");
            }

            catch (Exception ex)
            {
                // Log the exception message for debugging purposes
                Console.WriteLine(ex.Message);
                return BadRequest("Deletion error. Please try again later.");
            }
        }

        [HttpPut("Update/{id}")]
        public IActionResult Update(int id, [FromBody] Book updatedbooks)
        {
            try
            {
                var books = _context.Books.Find(id);
                if (books == null)
                {
                    return NotFound("Record not found.");
                }

                // Update properties
                //  gases.GasId = updatedgases.GasId;
                books.Title = updatedbooks.Title;
                // gases.DealerId = updatedgases.DealerId;
                books.Author = updatedbooks.Author;
                books.Genre = updatedbooks.Genre;
                books.ISBN = updatedbooks.ISBN;
                books.PublishDate = updatedbooks.PublishDate;




                _context.SaveChanges();

                return Ok("Record updated successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Update error. Please try again later.");
            }
        }

    }
}
