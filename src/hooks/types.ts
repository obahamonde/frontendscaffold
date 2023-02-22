export type MessageData = {
    id?: string | null;
    name?: string | null;
    time: string;
    message: string;
    avatar?: string | null;
};

export type NotifyProps = {
    mode?: string
    text: string
    icon?: string
    timeout?: number
}
