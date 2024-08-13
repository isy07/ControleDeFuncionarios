using ControleFuncionarios.Models;
using ControleFuncionarios.Services.FuncionarioService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleFuncionarios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionarioController : ControllerBase
    {
        private readonly IFuncionarioService _funcionarioService;

        public FuncionarioController(IFuncionarioService funcionarioService)
        {
            _funcionarioService = funcionarioService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<FuncionarioModel>>>> GetFuncionarios()
        {
            return Ok(await _funcionarioService.GetFuncionarios());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<FuncionarioModel>>> GetFuncionarioById(int id)
        {
            ServiceResponse<FuncionarioModel> serviceResponse = await _funcionarioService.GetFuncionarioById(id);
            return Ok(serviceResponse);

        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<FuncionarioModel>>>> CreateFuncionario(FuncionarioModel novoFuncionario)
        {
            return Ok(await _funcionarioService.CreateFuncionario(novoFuncionario));
        }

        [HttpPut("inativa-funcionario")]
        public async Task<ActionResult<ServiceResponse<List<FuncionarioModel>>>> InativaFuncionario(int id)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = await _funcionarioService.InativaFuncionario(id);

        return Ok(serviceResponse);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<List<FuncionarioModel>>>> UpdateFuncionario(FuncionarioModel editaFuncionario)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = await _funcionarioService.UpdateFuncionario(editaFuncionario);

            return Ok(serviceResponse);
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<List<FuncionarioModel>>>> DeleteFuncionario(int id)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = await _funcionarioService.DeleteFuncionario(id);

            return Ok(serviceResponse);
        }

    }
}
