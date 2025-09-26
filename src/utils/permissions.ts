import { PermissionsAndroid, Platform } from 'react-native';

export interface PermissionResult {
  granted: boolean;
  canAskAgain: boolean;
}

export async function requestPhotosPermission(): Promise<PermissionResult> {
  if (Platform.OS !== 'android') {
    return { granted: true, canAskAgain: true };
  }

  const sdk = Number(Platform.Version);

  const permission =
    sdk >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const result = await PermissionsAndroid.request(permission, {
    title: 'Acesso às fotos',
    message: 'Precisamos de acesso às suas fotos para selecionar imagens.',
    buttonPositive: 'Permitir',
    buttonNegative: 'Negar',
    buttonNeutral: 'Perguntar depois',
  });

  const granted = result === PermissionsAndroid.RESULTS.GRANTED;
  const canAskAgain = result !== PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;

  return { granted, canAskAgain };
}