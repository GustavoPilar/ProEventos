using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface ITokeService
    {
        Task<string> CreateToken(UserUpdateDto userUpdateDto);
    }
}