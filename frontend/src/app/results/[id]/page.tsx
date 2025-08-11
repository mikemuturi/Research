import ResultsPage from '@/components/results/ResultsPage';

interface PageProps {
  params: { id: string };
  searchParams: { public?: string };
}

export default function ResultsPageRoute({ params, searchParams }: PageProps) {
  const isPublic = searchParams.public === 'true';
  
  return (
    <ResultsPage 
      submissionId={params.id} 
      isPublic={isPublic}
    />
  );
}