/**
 * Link de compartilhamento do WhatsApp sem destinatário: o app pede para a
 * pessoa escolher o contato. O texto inteiro é codificado uma única vez.
 */
export function whatsappShareUrl(text: string, url: string): string {
  return `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
}

export function linkedinShareUrl(url: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}
