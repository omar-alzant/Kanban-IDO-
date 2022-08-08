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
    public class DonesController : ControllerBase
    {
        private readonly DataContext _context;

        public DonesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Dones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Done>>> GetDones()
        {
          if (_context.Dones == null)
          {
              return NotFound();
          }
            return await _context.Dones.ToListAsync();
        }

        // GET: api/Dones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Done>> GetDone(int id)
        {
          if (_context.Dones == null)
          {
              return NotFound();
          }
            var done = await _context.Dones.FindAsync(id);

            if (done == null)
            {
                return NotFound();
            }

            return done;
        }

        // PUT: api/Dones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDone(int id, Done done)
        {
            if (id != done.id)
            {
                return BadRequest();
            }

            _context.Entry(done).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoneExists(id))
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

        // POST: api/Dones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Done>> PostDone(Done done)
        {
          if (_context.Dones == null)
          {
              return Problem("Entity set 'DataContext.Dones'  is null.");
          }
            _context.Dones.Add(done);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDone", new { id = done.id }, done);
        }

        // DELETE: api/Dones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDone(int id)
        {
            if (_context.Dones == null)
            {
                return NotFound();
            }
            var done = await _context.Dones.FindAsync(id);
            if (done == null)
            {
                return NotFound();
            }

            _context.Dones.Remove(done);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoneExists(int id)
        {
            return (_context.Dones?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
