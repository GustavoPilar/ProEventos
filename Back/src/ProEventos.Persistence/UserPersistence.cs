using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Identity;
using ProEventos.Persistence.Contexto;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class UserPersistence : GeralProEventosPersistence, IUserPersistence
    {
        private readonly DataContext context;

        public UserPersistence(DataContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUserNameAsync(string username)
        {
            return await context.Users.SingleOrDefaultAsync(x => x.UserName == username.ToLower());
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await context.Users.ToListAsync();
        }
    }
}