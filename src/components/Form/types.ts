import { BaseSyntheticEvent } from "react";
import { Control, FieldValues } from "react-hook-form";


export interface FormField {
    name: string;
    label: string;
    placeholder: string;
    type: 'text' | 'email' | 'password';
    keyboardType?: 'default' | 'email-address' | 'numeric';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    required?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    noSpaces?: boolean;
    maxLength?: number; // Nova propriedade para limite de caracteres
  }
  
  
  export interface FormProps<T extends FieldValues> {
    title?: string;
    fields: FormField[];
    control: Control<T>;
    onSubmit: () => void;
    submitText: string;
    isPending?: boolean;
    bottomText?: string;
    bottomButtonText?: string;
    onBottomButtonPress?: () => void;
    yearText?: string;
  }
  