export const formatDate = (dateString: string): string => {
  let date: Date;

  // Detecta se a string está no formato "dd/mm/yyyy"
  const isDMY = /^\d{2}\/\d{2}\/\d{4}$/.test(dateString);

  if (isDMY) {
    // Se for dd/mm/yyyy, converte para Date manualmente
    const [day, month, year] = dateString.split('/');
    date = new Date(+year, +month - 1, +day);
  } else {
    // Caso contrário, tenta criar Date normalmente
    date = new Date(dateString);
  }

  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    return dateString; // retorna original se inválida
  }

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};