export interface Branch {
  _id?: string; // El ID es opcional ya que puede ser generado automáticamente por MongoDB
  country: string;
  street: string;
  city: string;
  zip_code: string;
  type: 'small' | 'medium' | 'large'; // Solo permite estos tres valores
}
