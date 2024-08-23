using ControleFuncionarios.DataContext;
using ControleFuncionarios.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleFuncionarios.Services.FuncionarioService
{
    public class FuncionarioService : IFuncionarioService
    {
        private readonly ApplicationDbContext _context;

        public FuncionarioService(ApplicationDbContext context)
        {
            _context = context;
        }
        //public async Task<ServiceResponse<List<FuncionarioModel>>> CreateFuncionario(FuncionarioModel novoFuncionario)
        //{
        //    ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();

        //    try
        //    {
        //        if(novoFuncionario == null)
        //        {
        //            serviceResponse.Dados = null;
        //            serviceResponse.Mensagem = "Erro ao incluir Funcionário!";
        //            serviceResponse.Sucesso = false;

        //            return serviceResponse;
        //        }

        //        _context.Add(novoFuncionario);
        //        await _context.SaveChangesAsync();

        //        serviceResponse.Dados = _context.Funcionarios.ToList();

        //    }
        //    catch (Exception ex)
        //    {
        //        serviceResponse.Mensagem = ex.Message;
        //        serviceResponse.Sucesso = false;
        //    }
        //    return serviceResponse;


        //}

        public async Task<ServiceResponse<List<FuncionarioModel>>> CreateFuncionario(FuncionarioModel novoFuncionario)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();

            try
            {
                if (novoFuncionario == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Erro ao incluir Funcionário!";
                    serviceResponse.Sucesso = false;

                    return serviceResponse;
                }

                bool funcionarioExiste = _context.Funcionarios.Any(f =>
                    f.Nome == novoFuncionario.Nome &&
                    f.Sobrenome == novoFuncionario.Sobrenome &&
                    f.Departamento == novoFuncionario.Departamento &&
                    f.Turno == novoFuncionario.Turno
                   );

                if (funcionarioExiste)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Erro! Funcionário já cadastrado no sistema!";
                    serviceResponse.Sucesso = false;
                    return serviceResponse;
                }


                _context.Add(novoFuncionario);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = _context.Funcionarios.ToList();

            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;


        }

        public async Task<ServiceResponse<List<FuncionarioModel>>> DeleteFuncionario(int id)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();

            try
            {
                FuncionarioModel funcionario = _context.Funcionarios.FirstOrDefault(x => x.Id == id);

                if (funcionario == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Funcionário não encontrado!";
                    serviceResponse.Sucesso = false;
                }

                _context.Funcionarios.Remove(funcionario);
                await _context.SaveChangesAsync();
                serviceResponse.Dados = _context.Funcionarios.ToList();

                _context.Funcionarios.Update(funcionario);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = _context.Funcionarios.ToList();

            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;




        }

        public async Task<ServiceResponse<FuncionarioModel>> GetFuncionarioById(int id)
        {
            ServiceResponse<FuncionarioModel> serviceResponse = new ServiceResponse<FuncionarioModel>();

            try
            {
                FuncionarioModel funcionario = _context.Funcionarios.FirstOrDefault(x => x.Id == id);

                if (serviceResponse.Dados == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Funcionário não encontrado!";
                    serviceResponse.Sucesso = false;
                }

                serviceResponse.Dados = funcionario;

            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;


        }

        public async Task<ServiceResponse<List<FuncionarioModel>>> GetFuncionarios()
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();

            try
            {
                serviceResponse.Dados = _context.Funcionarios.ToList();
                if (serviceResponse.Dados.Count == 0)
                {
                    serviceResponse.Mensagem = "Nenhum funcionário encontrado!";
                }

            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;

        }

        public async Task<ServiceResponse<List<FuncionarioModel>>> InativaFuncionario(int id)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();

            try
            {
                FuncionarioModel funcionario = _context.Funcionarios.FirstOrDefault(x => x.Id == id);

                if (funcionario == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Funcionário não encontrado!";
                    serviceResponse.Sucesso = false;
                }
                if (funcionario.Ativo == true)
                {
                    funcionario.Ativo = false;
                }
                else
                {
                    funcionario.Ativo = true;
                }

                funcionario.DataAlteracao = DateTime.Now.ToLocalTime();

                _context.Funcionarios.Update(funcionario);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = _context.Funcionarios.ToList();

            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;


        }

        //public async Task<ServiceResponse<List<FuncionarioModel>>> UpdateFuncionario(FuncionarioModel editaFuncionario)
        //{
        //    ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();

        //    try
        //    {
        //        FuncionarioModel funcionario = _context.Funcionarios.AsNoTracking().FirstOrDefault(x => x.Id == editaFuncionario.Id);

        //        if (funcionario == null)
        //        {
        //            serviceResponse.Dados = null;
        //            serviceResponse.Mensagem = "Funcionário não encontrado!";
        //            serviceResponse.Sucesso = false;
        //        }

        //        bool funcionarioExiste = await _context.Funcionarios
        //        .AnyAsync(f =>
        //        f.Id != editaFuncionario.Id &&
        //        f.Nome == editaFuncionario.Nome &&
        //        f.Sobrenome == editaFuncionario.Sobrenome &&
        //        f.Departamento == editaFuncionario.Departamento &&
        //        f.Turno == editaFuncionario.Turno
        //    );

        //        if (funcionarioExiste)
        //        {
        //            serviceResponse.Dados = null;
        //            serviceResponse.Mensagem = "Erro! Já existe funcionário com estes dados cadastrado no sistema!";
        //            serviceResponse.Sucesso = false;
        //            return serviceResponse;
        //        }

        //        funcionario.DataAlteracao = DateTime.Now.ToLocalTime();
        //        _context.Funcionarios.Update(editaFuncionario);
        //        await _context.SaveChangesAsync();
        //        serviceResponse.Dados = _context.Funcionarios.ToList();

        //        _context.Funcionarios.Update(funcionario);
        //        await _context.SaveChangesAsync();

        //        serviceResponse.Dados = _context.Funcionarios.ToList();

        //    }
        //    catch (Exception ex)
        //    {
        //        serviceResponse.Mensagem = ex.Message;
        //        serviceResponse.Sucesso = false;
        //    }

        //    return serviceResponse;

        //}
        //}
        public async Task<ServiceResponse<List<FuncionarioModel>>> UpdateFuncionario(FuncionarioModel editaFuncionario)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();

            try
            {
                // Verifica se o funcionário a ser atualizado existe
                var funcionarioExistente = await _context.Funcionarios
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == editaFuncionario.Id);

                if (funcionarioExistente == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Funcionário não encontrado!";
                    serviceResponse.Sucesso = false;
                    return serviceResponse;
                }

                // Checa se já existe um funcionário com os mesmos dados (exceto o funcionário sendo atualizado)
                bool funcionarioExiste = await _context.Funcionarios
                    .AnyAsync(f =>
                        f.Id != editaFuncionario.Id &&
                        f.Nome == editaFuncionario.Nome &&
                        f.Sobrenome == editaFuncionario.Sobrenome &&
                        f.Departamento == editaFuncionario.Departamento &&
                        f.Turno == editaFuncionario.Turno
                    );

                if (funcionarioExiste)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Erro! Já existe funcionário com estes dados cadastrado no sistema!";
                    serviceResponse.Sucesso = false;
                    return serviceResponse;
                }

                // Atualiza os dados do funcionário
                // Encontre a entidade existente no contexto para atualizar
                var funcionarioParaAtualizar = _context.Funcionarios.Find(editaFuncionario.Id);

                if (funcionarioParaAtualizar == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Funcionário não encontrado!";
                    serviceResponse.Sucesso = false;
                    return serviceResponse;
                }

                // Atualize as propriedades necessárias
                funcionarioParaAtualizar.Nome = editaFuncionario.Nome;
                funcionarioParaAtualizar.Sobrenome = editaFuncionario.Sobrenome;
                funcionarioParaAtualizar.Departamento = editaFuncionario.Departamento;
                funcionarioParaAtualizar.Turno = editaFuncionario.Turno;
                funcionarioParaAtualizar.DataAlteracao = DateTime.Now.ToLocalTime();

                // Salve as alterações
                await _context.SaveChangesAsync();

                // Retorna a lista atualizada de funcionários
                serviceResponse.Dados = await _context.Funcionarios.ToListAsync();
                serviceResponse.Sucesso = true;
            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;
        }
    }

    }
