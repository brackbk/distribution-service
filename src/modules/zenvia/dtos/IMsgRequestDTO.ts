export default interface IMsgRequestDTO {
    id: string;
    timestamp: string;
    type: string,
    subscriptionId: string,
    channel: string,
    direction: string,
    message: {
      id: string,
      from: string,
      to: string,
      direction: string,
      channel: string,
      visitor: {
        name: string,
        firstName: string,
        lastName: string,
      },
      contents: [
        {
          type: string,
          text: string,
        }
      ],
      timestamp: string,
    }
  }