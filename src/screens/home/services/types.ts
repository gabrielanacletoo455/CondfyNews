export interface Posts {
    id: number;
    title: string;
    content: string;
    comments: Comment[];
    author: Author;
    createdAt: string;
    imageUrl?: string;
}



export interface Author {
    id: number;
    userName: string;
    birthDate: string;
    gender: string;
    photoProfile: string;
    bioDescription: string;
    website: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    authorId: number;
    postId: number;
    author: Author;
}