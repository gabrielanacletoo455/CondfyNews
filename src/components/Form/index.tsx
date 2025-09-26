import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import CommonButton from '../CommonButton';
import { FormField, FormProps } from './types';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Form = <T extends FieldValues>({
  title,
  fields,
  control,
  onSubmit,
  submitText,
  isPending = false,
  bottomText,
  bottomButtonText,
  onBottomButtonPress,
  yearText,
}: FormProps<T>) => {
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const renderField = (field: FormField) => {
    const isPassword = field.type === 'password';
    const isShowingPassword = showPassword[field.name];
    const isMultiline = field.multiline;

    // Função para remover espaços se necessário
    const handleTextChange = (text: string, onChange: (value: string) => void) => {
      if (field.noSpaces) {
        // Remove todos os espaços em branco
        const cleanedText = text.replace(/\s/g, '');
        onChange(cleanedText);
      } else {
        onChange(text);
      }
    };
    

    if (isPassword) {
      return (
        <View key={field.name} style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{field.label}</Text>
          <Controller
            control={control}
            name={field.name as Path<T>}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  autoCapitalize={field.autoCapitalize || 'none'}
                  autoCorrect={field.autoCorrect || false}
                  // secureTextEntry={!isShowingPassword}
                  placeholder={field.placeholder}
                  onChangeText={(text) => handleTextChange(text, onChange)}
                  onBlur={onBlur}
                  value={value}
                  placeholderTextColor="#888888"
                  maxLength={field.maxLength} // Adicionando maxLength
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => togglePasswordVisibility(field.name)}
                >
                  <Text style={styles.eyeIcon}>
                    {isShowingPassword ? <MaterialIcons name="visibility-off" size={24} color="#6A5ACD" /> : <MaterialIcons name="visibility" size={24} color="#6A5ACD" />}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      );
    }

    return (
      <View key={field.name} style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{field.label}</Text>
        <Controller
          control={control}
          name={field.name as Path<T>}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                isMultiline && styles.multilineInput 
              ]}
              autoCapitalize={field.autoCapitalize || 'none'}
              autoCorrect={field.autoCorrect || false}
              keyboardType={field.keyboardType || 'default'}
              placeholder={field.placeholder}
              onChangeText={(text) => handleTextChange(text, onChange)}
              onBlur={onBlur}
              value={value}
              placeholderTextColor="#888888"
              multiline={isMultiline}
              numberOfLines={field.numberOfLines || (isMultiline ? 4 : 1)}
              textAlignVertical={isMultiline ? 'top' : 'center'}
              maxLength={field.maxLength} // Adicionando maxLength
            />
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {title && (
      <Text style={styles.title}>{title}</Text>
      )}
      <View style={styles.inputContainer}>
        {fields.map(renderField)}
      </View>

      <CommonButton
        text={submitText}
        onPress={onSubmit}
        disabled={isPending}
        loading={isPending}
      />

      {bottomText && bottomButtonText && onBottomButtonPress && (
        <View style={styles.containerBottom}>
          <Text style={styles.textBottom}>{bottomText}</Text>
          <TouchableOpacity style={styles.buttonBottom} onPress={onBottomButtonPress}>
            <Text style={styles.textButton}>{bottomButtonText}</Text>
          </TouchableOpacity>
        </View>
      )}

      {yearText && (
        <Text style={styles.textYear}>{yearText}</Text>
      )}
    </View>
  );
};

export default Form;
