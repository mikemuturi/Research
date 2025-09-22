import ResultsPage from '@/components/results/ResultsPage';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ public?: string }>;
}

export default async function ResultsPageRoute({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : {};
  const isPublic = sp.public === 'true';

  return (
    <ResultsPage 
      submissionId={id} 
      isPublic={isPublic}
    />
  );
}







//import ResultsPage from '@/components/results/ResultsPage';

//interface PageProps {
  //params: { id: string };
  //searchParams: { public?: string };
//}

//export default function ResultsPageRoute({ params, searchParams }: PageProps) {
 // const isPublic = searchParams.public === 'true';
  
  //return (
   // <ResultsPage 
    //  submissionId={params.id} 
  //    isPublic={isPublic}
//    />
  //);
//}
