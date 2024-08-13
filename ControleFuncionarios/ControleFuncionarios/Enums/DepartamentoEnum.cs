using System.Text.Json.Serialization;

namespace ControleFuncionarios.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum DepartamentoEnum
    {
        RH,
        Financeiro, 
        Compras,
        Atendimento,
        Zeladoria
    }
}
