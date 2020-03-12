export class Task {
    id: number;
    name: string;
    priority: Priority;
    dueDate: Date;
    complete: boolean;
}

export enum Priority {
    low = 'low',
    medium = 'medium',
    high = 'high'
}
