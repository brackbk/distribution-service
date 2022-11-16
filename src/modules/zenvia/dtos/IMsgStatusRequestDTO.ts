export default interface IMsgStatusRequestDTO {
    id: string;
    type: string;
    subscriptionId: string;
    messageId: string;
    messageStatus: {
        timestamp: string,
        code:  string,
        description: string,
        causes: any
    };
    contentIndex: number;
}