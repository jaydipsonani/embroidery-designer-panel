import toast from 'react-hot-toast';

export const slugify = (str: string) =>
  str
    ?.toLowerCase()
    ?.trim()
    ?.replace(/[^\w\s-]/g, '')
    ?.replace(/[\s_-]+/g, '-')
    ?.replace(/^-+|-+$/g, '');

export const formatTextWithLineBreaks = (text: string) => {
  return text?.replace(/\r\n/g, '<br>');
};

export const scrollToTop = () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.addEventListener('beforeunload', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

export const addClassToDocumentElement = (className: string) => {
  document.documentElement.classList.add(className);
};

export const removeClassToDocumentElement = (className: string) => {
  document.documentElement.classList.remove(className);
};

export const handleKeyDown = (e: any) => {
  // Allow only backspace, delete, tab, escape, enter, and arrow keys
  if (
    e.key === 'Backspace' ||
    e.key === 'Delete' ||
    e.key === 'Tab' ||
    e.key === 'Escape' ||
    e.key === 'Enter' ||
    e.key === 'ArrowLeft' ||
    e.key === 'ArrowRight' ||
    (e.key === 'a' && (e.ctrlKey || e.metaKey)) || // Allow Ctrl+A or Cmd+A
    (e.key === 'c' && (e.ctrlKey || e.metaKey)) || // Allow Ctrl+C or Cmd+C
    (e.key === 'v' && (e.ctrlKey || e.metaKey)) || // Allow Ctrl+V or Cmd+V
    (e.key === 'x' && (e.ctrlKey || e.metaKey)) || // Allow Ctrl+X or Cmd+X
    e.key === '.' // Allow dot
  ) {
    return;
  }

  // Ensure that it is a number and stop the keypress
  if (e.shiftKey || e.key < '0' || e.key > '9') {
    e.preventDefault();
  }
};

export const toastError = (message: any) => {
  toast.error(message, {
    style: {
      borderRadius: '10px',
      color: '#000000',
      marginTop: '50px',
      border: '1px solid #DB4446',
      boxShadow: '0px 0px 4px 0px #DB444640',
    },
    position: 'top-right',
    duration: 2000,
  });
};

export const toastSuccess = (message: any) => {
  toast.success(message, {
    style: {
      borderRadius: '10px',
      color: '#000000',
      marginTop: '50px',
      border: '1px solid #40CD8A',
      boxShadow: '0px 0px 4px 0px #40CD8A40',
    },
    position: 'top-right',
    duration: 2000,
  });
};

export const handleOnCopy = (textToCopy: any) => {
  if (textToCopy) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toastSuccess('Copied successfully!');
      })
      .catch((err) => {
        toastError('Failed to copy!');
      });
  }
};

// Exporting functions to be used in other components
export const requestForToken = async () => {
  return null;
  // }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    // if (messaging) {
    //   onMessage(messaging, (payload: any) => {
    //     resolve(payload);
    //   });
    // }
  });

// Detect user's timezone, defaulting to null if not available
export const detectedTimeZone = (() => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch (error) {
    console.error('Error detecting timezone:', error);
    return null;
  }
})();
