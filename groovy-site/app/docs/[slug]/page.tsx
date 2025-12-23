import { COMPONENTS } from '@/config/components.config';
import ComponentTemplate from '@/components/ComponentTemplate';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return Object.keys(COMPONENTS).map((slug) => ({ slug }));
}

export default async function ComponentPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const component = COMPONENTS[slug];
  
  if (!component) {
    notFound();
  }
  
  return <ComponentTemplate component={component} />;
}