interface Author {
    id: number;
    userName: string;
    birthDate: string | null;
    gender: string | null;
    photoProfile: string | null;
    bioDescription: string | null;
    website: string | null;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface Comment {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    authorId: number;
    postId: number;
}

interface MyContentType {
    id: number;
    title: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    author: Author;
    authorId: number;
    comments: Comment[];
}

export type { MyContentType };