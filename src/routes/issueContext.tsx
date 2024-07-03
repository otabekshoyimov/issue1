import { createContext, ReactNode, useContext, useState } from 'react';

const IssueContext = createContext<TIssueContext>(null!);

type TIssueProviderProps = {
  children: ReactNode;
};
export const IssueProvider = ({ children }: TIssueProviderProps) => {
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssueDescription, setNewIssueDescription] = useState('');
  const [error, setError] = useState('');

  return (
    <IssueContext.Provider
      value={{
        newIssueTitle,
        setNewIssueTitle,
        newIssueDescription,
        setNewIssueDescription,
        error,
        setError,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};
export const useIssueContext = () => {
  const context = useContext(IssueContext);
  if (context === null) {
    throw new Error('useIssueContext must be used within an IssueProvider');
  }
  return context;
};

type TIssueContext = {
  newIssueTitle: string;
  setNewIssueTitle: (title: string) => void;
  newIssueDescription: string;
  setNewIssueDescription: (description: string) => void;
  error: string;
  setError: (error: string) => void;
};
