using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain.Identity;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IMapper mapper;
        private readonly IUserPersistence userPersistence;

        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, IUserPersistence userPersistence)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.userPersistence = userPersistence;
        }

        public async Task<SignInResult> CheckUserPasswordAsync(UserUpdateDto userUpdateDto, string password)
        {
            try
            {
                var user = await userManager.Users.SingleOrDefaultAsync(user => user.UserName == userUpdateDto.UserName.ToLower());

                return await signInManager.CheckPasswordSignInAsync(user, password, false);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar verificar Password. Erro {ex.Message}");
            }
        }

        public async Task<UserDto> CreateAccountAsync(UserDto userDto)
        {
            try
            {
                var user = mapper.Map<User>(userDto);
                var result = await userManager.CreateAsync(user, userDto.Password);

                if (result.Succeeded)
                {
                    var userToReturn = mapper.Map<UserDto>(user);
                    return userToReturn;
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar criar Usuário. Erro {ex.Message}");
            }
        }

        public async Task<UserUpdateDto> GetUserByUserNameAsync(string username)
        {
            try
            {
                var user = await userPersistence.GetUserByUserNameAsync(username);

                if (user == null)
                {
                    return null;
                }

                var userUpdateDto = mapper.Map<UserUpdateDto>(user);
                return userUpdateDto;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar buscar usuário por Username. Erro {ex.Message}");
            }
        }

        public async Task<UserUpdateDto> UpdateAccount(UserUpdateDto userUpdateDto)
        {
            try
            {
                var user = await userPersistence.GetUserByUserNameAsync(userUpdateDto.UserName);
                if (user == null) return null;

                mapper.Map(userUpdateDto, user);

                var token = await userManager.GeneratePasswordResetTokenAsync(user);

                var result = await userManager.ResetPasswordAsync(user, token, userUpdateDto.Password);

                userPersistence.Update<User>(user);

                if (await userPersistence.SaveChangesAsync())
                {
                    var userRetorno = await userPersistence.GetUserByUserNameAsync(user.UserName);

                    return mapper.Map<UserUpdateDto>(userRetorno);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao tentar atualizar Usuário. Erro {ex.Message}");
            }
        }

        public async Task<bool> UserExists(string username)
        {
            try
            {
                return await userManager.Users.AnyAsync(user => user.UserName == username.ToLower());
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao verificar se usuário existe. Erro {ex.Message}");
            }
        }
    }
}