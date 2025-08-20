export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const formatDateTime = (dateString: string, year: boolean = true) => {
    return new Date(dateString).toLocaleString('en-US', {
        ...(year ? { year: 'numeric' } : {}),
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const statusStyles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    cancelled: 'bg-rose-50 text-rose-700 border border-rose-200',
    completed: 'bg-lime-50 text-lime-700 border border-lime-200',
  
    // Wallet transactions specific
    failed: 'bg-orange-50 text-orange-700 border border-orange-200',
    processing: 'bg-sky-50 text-sky-700 border border-sky-200',
  
    // Escrows specific
    active: 'bg-teal-50 text-teal-700 border border-teal-200',
    disputed: 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200',
  };