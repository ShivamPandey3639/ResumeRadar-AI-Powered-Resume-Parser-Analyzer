import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { isValidFileType, isValidFileSize } from '@/lib/parsers/document-parser';

interface ResumeUploaderProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  success: boolean;
}

export function ResumeUploader({
  onUpload,
  isUploading,
  uploadProgress,
  error,
  success
}: ResumeUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;
    
    // Validate file type
    if (!isValidFileType(file)) {
      setValidationError('Invalid file type. Please upload a PDF, DOCX, or TXT file.');
      return;
    }
    
    // Validate file size
    if (!isValidFileSize(file)) {
      setValidationError('File is too large. Maximum size is 10MB.');
      return;
    }
    
    setValidationError(null);
    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  const handleUpload = async () => {
    if (selectedFile && !isUploading) {
      await onUpload(selectedFile);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Your Resume</CardTitle>
        <CardDescription>
          Drag and drop your resume file or click to browse. We support PDF, DOCX, and TXT formats.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
          } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <Upload size={40} className="text-muted-foreground" />
            {isDragActive ? (
              <p className="text-lg font-medium">Drop your resume here...</p>
            ) : (
              <p className="text-lg font-medium">
                Drag & drop your resume here, or click to select a file
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Supported formats: PDF, DOCX, TXT (Max size: 10MB)
            </p>
          </div>
        </div>

        {selectedFile && (
          <div className="mt-4 p-4 border rounded-lg flex items-center gap-3">
            <FileText className="text-primary" />
            <div className="flex-1">
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {!isUploading && !success && (
              <Button onClick={handleUpload}>Upload</Button>
            )}
          </div>
        )}

        {isUploading && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Uploading and processing...</p>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {(validationError || error) && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {validationError || error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Success</AlertTitle>
            <AlertDescription>
              Your resume has been uploaded and processed successfully.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>
          Your resume will be analyzed using AI to extract key information and match it with job postings.
        </p>
      </CardFooter>
    </Card>
  );
} 