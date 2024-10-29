using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [
            Required(ErrorMessage = "O campo {0} é obrigratório!"),
        // MinLength(3, ErrorMessage = "O campo {0} deve ter no mínimo 4 caracteres."),
        //MaxLength(50, ErrorMessage = "O campo {0} deve ter no máximo 50 caracteres.")
            StringLength(50, MinimumLength = 3, ErrorMessage = "Intervalo permitido de 3 a 50 caracteres.")
        ]
        public string Tema { get; set; }

        [
            Display(Name = "Qtd de Pessoas"),
            Range(1, 120000, ErrorMessage = "{0} deve ser entre 1 à 120000.")
        ]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpg|jpeg|bmp|png)$", ErrorMessage = "Imagem inválida. Formato aceito: (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório!")]
        [Phone(ErrorMessage = "Formato de telefone inválido. Formato aceito: +00 (00) 0 0000-0000")]
        public string Telefone { get; set; }


        [
            Display(Name = "E-mail"),
            Required(ErrorMessage = "Campo {0} obrigatório."),
            EmailAddress(ErrorMessage = "É necessário ser um {0} válido.")
        ]
        public string Email { get; set; }
        
        public IEnumerable<LoteDto>? Lotes { get; set; }
        public IEnumerable<RedeSocialDto>? RedesSociais { get; set; }
        public IEnumerable<PalestranteDto>? Palestrantes { get; set; }
    }
}