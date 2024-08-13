using System.Text.Json.Serialization;

namespace ControleFuncionarios.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TurnoEnum
    {
        Manha,
        Tarde, 
        Noite
    }
}
