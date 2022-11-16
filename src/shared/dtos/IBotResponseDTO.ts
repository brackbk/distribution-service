export default interface IBotResponseDTO {
    code: number,
    messages: [{
        text: {
            text: []
        }
    }],
    contexts:  any
  }