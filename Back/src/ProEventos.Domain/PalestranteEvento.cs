using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Domain
{
    public class PalestranteEvento
    {
        [ForeignKey(nameof(Palestrante))]
        public int PalestranteId { get; set; }
        public Palestrante Palestrante { get; set; }
        
        [ForeignKey(nameof(Evento))]
        public int EventoId { get; set; }
        public Evento Evento { get; set; }
    }
}