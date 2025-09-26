
export interface ProfileFormData {
    id?: number;
    userName: string;
    email: string;
    bioDescription: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    website: string;
    whatsapp: string;
    photoProfile: string;
}


export interface UserProfile {
    id: number;
    userName: string;
    birthDate: string | null;
    gender: string | null;
    bioDescription: string | null;
    email: string;
    createdAt: string;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
    website: string | null;
    whatsapp: string | null;
    photoProfile: string | null;
    posts: UserPost[];
  }
  

  export interface UserPost {
    id: number;
    title: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    authorId: number;
    comments: UserComment[];
  }
  

  export interface UserComment {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    authorId: number;
    postId: number;
  }
  
