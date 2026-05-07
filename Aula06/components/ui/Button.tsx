import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const colorScheme = useColorScheme();

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`${size}Button`], style];

    switch (variant) {
      case 'primary':
        return [
          ...baseStyle,
          {
            backgroundColor: disabled
              ? Colors[colorScheme ?? 'light'].tabIconDefault
              : Colors[colorScheme ?? 'light'].tint,
          },
        ];
      case 'secondary':
        return [
          ...baseStyle,
          {
            backgroundColor: disabled
              ? '#E5E5E5'
              : '#F8F9FA',
            borderWidth: 1,
            borderColor: '#E9ECEF',
          },
        ];
      case 'outline':
        return [
          ...baseStyle,
          {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Colors[colorScheme ?? 'light'].tint,
          },
        ];
      case 'ghost':
        return [
          ...baseStyle,
          { backgroundColor: 'transparent' },
        ];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseTextStyle = [styles.buttonText, styles[`${size}Text`]];

    switch (variant) {
      case 'primary':
        return [...baseTextStyle, { color: '#FFFFFF' }];
      case 'secondary':
        return [...baseTextStyle, { color: '#212529' }];
      case 'outline':
      case 'ghost':
        return [
          ...baseTextStyle,
          { color: Colors[colorScheme ?? 'light'].tint },
        ];
      default:
        return baseTextStyle;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : Colors[colorScheme ?? 'light'].tint}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  gradient?: boolean;
}

export function Card({ children, style, onPress, gradient = false }: CardProps) {
  const colorScheme = useColorScheme();

  const cardContent = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
          shadowColor: colorScheme === 'dark' ? '#000' : '#000',
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (gradient) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <LinearGradient
          colors={['#667EEA', '#764BA2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          {cardContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      {cardContent}
    </TouchableOpacity>
  );
}

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

export function LoadingSpinner({ size = 'large', color, style }: LoadingSpinnerProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.spinnerContainer, style]}>
      <ActivityIndicator
        size={size}
        color={color || Colors[colorScheme ?? 'light'].tint}
      />
    </View>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export function ErrorMessage({ message, onRetry, style }: ErrorMessageProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.errorContainer, style]}>
      <Text style={[styles.errorText, { color: '#DC3545' }]}>{message}</Text>
      {onRetry && (
        <Button
          title="Tentar Novamente"
          onPress={onRetry}
          variant="outline"
          size="sm"
          style={styles.retryButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  smButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  mdButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  lgButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    minHeight: 52,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientCard: {
    borderRadius: 16,
    padding: 2,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  retryButton: {
    marginTop: 8,
  },
});