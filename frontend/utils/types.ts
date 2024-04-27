export interface SharedModalProps {
  images?: string[];
  currentPhoto?: string;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}
