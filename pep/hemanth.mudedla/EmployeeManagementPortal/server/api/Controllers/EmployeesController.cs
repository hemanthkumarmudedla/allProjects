using api.Interfaces;
using api.Models.Dtos;
using api.Models.Entities;
using api.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _repo;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<EmployeeDto[]>> GetAll()
        {
            try
            {
                var employees = await _repo.GetAllEmployeesAsync();

                if (employees == null) return NotFound();

                return _mapper.Map<EmployeeDto[]>(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal sever error: {ex}");
            }
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(Guid id)
        {
            try
            {
                var employee = await _repo.GetEmployeeAsync(id);

                if (employee == null) return NotFound();

                return _mapper.Map<EmployeeDto>(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPost(Name = nameof(AddEmployee))]
        public async Task<ActionResult<EmployeeCreateDto>> AddEmployee([FromBody] EmployeeCreateDto employeeCreate)
        {
            try
            {
                var employee = _mapper.Map<Employee>(employeeCreate);

                _repo.Add(employee);

                if (await _repo.SaveAllAsync())
                {
                    return CreatedAtAction(nameof(GetEmployee),
                        new { id = employee.Id },
                        _mapper.Map<EmployeeCreateDto>(employee));
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }

            return BadRequest();
        }

        [HttpPut("{id}", Name = nameof(UpdateEmployee))]
        public async Task<ActionResult> UpdateEmployee([FromRoute] Guid id, [FromBody] EmployeeUpdateDto employeeToUpdate)
        {
            try
            {
                var employeeFromRepo = await _repo.GetEmployeeAsync(id);

                if (employeeFromRepo == null) return NotFound();

                _mapper.Map(employeeToUpdate, employeeFromRepo);

                if (employeeToUpdate == null) return BadRequest();

                if (await _repo.SaveAllAsync())
                {
                    return Ok(_mapper.Map<EmployeeUpdateDto>(employeeFromRepo));
                }
                else
                {
                    return BadRequest("Could not save changes");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
                // throw new Exception($"Update employee with {id} failed to save");
            }
        }

        [HttpDelete("{id}", Name = nameof(DeleteEmployee))]
        public async Task<ActionResult> DeleteEmployee(Guid id)
        {
            try
            {
                var employee = await _repo.GetEmployeeAsync(id);

                if (employee == null) return NotFound();

                _repo.Delete(employee);

                if (await _repo.SaveAllAsync())
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }

            return BadRequest();
        }
    }
}
