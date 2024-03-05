using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace API_RESTFULL.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NumberProcessingController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> ProcessNumbers(List<int> numbers)
        {
            try
            {
                // Verifique se a lista de n�meros n�o est� vazia
                if (numbers == null || numbers.Count == 0)
                {
                    return BadRequest("A lista de n�meros est� vazia.");
                }

                // Diret�rio onde os arquivos ser�o salvos (diret�rio corrente)
                string directoryPath = Directory.GetCurrentDirectory();

                foreach (var number in numbers)
                {
                    // Caminho do arquivo
                    string filePath = Path.Combine(directoryPath, $"tabuada_de_{number}.txt");

                    // Abra ou crie o arquivo para escrita
                    using (StreamWriter writer = new StreamWriter(filePath))
                    {
                        // Escreva a tabuada no arquivo
                        await WriteTabuadaAsync(writer, number);
                    }
                }

                // Retorne um resultado de sucesso
                return Ok("Processamento dos n�meros conclu�do com sucesso!");
            }
            catch (Exception ex)
            {
                // Em caso de erro, retorne um resultado de falha
                return StatusCode(500, $"Ocorreu um erro ao processar os n�meros: {ex.Message}");
            }
        }

        private async Task WriteTabuadaAsync(StreamWriter writer, int number)
        {
            // Escreva a tabuada de 1 a 10 no formato "n x tabNum = r" no arquivo
            await writer.WriteLineAsync($"Tabuada de {number}:");
            for (int i = 1; i <= 10; i++)
            {
                int result = number * i;
                await writer.WriteLineAsync($"{number} x {i} = {result}");
            }
        }
    }
}
