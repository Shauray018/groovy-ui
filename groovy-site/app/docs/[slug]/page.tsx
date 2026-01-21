import { COMPONENT_CONFIGS, ComponentSlug } from '@/lib/docs/components';
import { notFound } from 'next/navigation';
import { ComponentPreviewTemplate } from '@/components/ComponentTemplate';
import { fetchGithubSource } from '@/lib/docs/fetchGithubSource';

export async function generateStaticParams() {
  return Object.keys(COMPONENT_CONFIGS).map((slug) => ({ slug }));
}

export default async function ComponentPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  
  const { slug } = await params;
  
  const componentConfig = COMPONENT_CONFIGS[slug as ComponentSlug];
  
  if (!componentConfig) {
    console.log('❌ [ComponentPage] Component config not found for slug:', slug);
    notFound();
  }


  // Fetch source code from GitHub if URL is provided
  let sourceCode: string | null = null;
  if (componentConfig.githubUrl) {
    sourceCode = await fetchGithubSource(componentConfig.githubUrl);
    
  } else {
    console.log('⚠️ [ComponentPage] No GitHub URL provided');
  }

  // Merge the fetched source code into the component config
  const component = {
    ...componentConfig,
    sourceCode: sourceCode || componentConfig.sourceCode || '// Source code unavailable'
  };
  
  
  return <ComponentPreviewTemplate component={component} slug={slug} />;
}