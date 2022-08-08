using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using kanbanApi;
using kanbanApi.Data;

namespace kanban_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoingsController : ControllerBase
    {
        private readonly DataContext _context;

        public DoingsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Doings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doing>>> GetDoings()
        {
          if (_context.Doings == null)
          {
              return NotFound();
          }
            return await _context.Doings.ToListAsync();
        }

        // GET: api/Doings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Doing>> GetDoing(int id)
        {
          if (_context.Doings == null)
          {
              return NotFound();
          }
            var doing = await _context.Doings.FindAsync(id);

            if (doing == null)
            {
                return NotFound();
            }

            return doing;
        }

        // PUT: api/Doings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoing(int id, Doing doing)
        {
            if (id != doing.id)
            {
                return BadRequest();
            }

            _context.Entry(doing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Doings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Doing>> PostDoing(Doing doing)
        {
          if (_context.Doings == null)
          {
              return Problem("Entity set 'DataContext.Doings'  is null.");
          }
            _context.Doings.Add(doing);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDoing", new { id = doing.id }, doing);
        }

        // DELETE: api/Doings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoing(int id)
        {
            if (_context.Doings == null)
            {
                return NotFound();
            }
            var doing = await _context.Doings.FindAsync(id);
            if (doing == null)
            {
                return NotFound();
            }

            _context.Doings.Remove(doing);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoingExists(int id)
        {
            return (_context.Doings?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
