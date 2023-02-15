using api.Context;
using api.Interfaces;
using api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class EmployeeRepository: IEmployeeRepository
    {
        private readonly EMPContext _dbContext;

        public EmployeeRepository(EMPContext dbContext)
        {
            _dbContext = dbContext;
            
        }

        public void Add<T>(T entity) where T : class
        {
           
            _dbContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            
            _dbContext.Remove(entity);
        }


        public async Task<Employee> GetEmployeeAsync(Guid id)
        { 

            IQueryable<Employee> query = _dbContext.Employees.Where(e => e.Id == id);

            // var employee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Name == name);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Employee[]> GetAllEmployeesAsync()
        {

            var employees = await _dbContext.Employees.OrderByDescending(e => e.Name).ToArrayAsync();

            return employees;
        }

        public async Task<bool> SaveAllAsync()
        {
            try
            {
                return await _dbContext.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
