import { CodeSnippet } from "@/components/code-snippet"

export default function InstallationPage() { 
    return ( 
        <div>
            <h1 className="text-4xl font-semibold">    
                Installation
            </h1>
            <div className="p-4">
                just copy the below command 
            </div>

            <CodeSnippet code="npx groovy-native-ui init"  />

        </div>
    )
}