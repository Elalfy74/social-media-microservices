import { useRef, useState } from 'react';
import { Button, Text, Image, TextInput } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export function NewPostContent() {
  const [files, setFile] = useState<FileWithPath[]>([]);
  const openRef = useRef<() => void>(null);

  const preview = () => {
    const imageUrl = URL.createObjectURL(files[0]);
    return <Image src={imageUrl} imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }} />;
  };

  const empty = files.length === 0;

  return (
    <>
      <TextInput size="md" placeholder="Enter a title" label="Title" withAsterisk mb={30} />
      <Dropzone
        onDrop={setFile}
        openRef={openRef}
        accept={IMAGE_MIME_TYPE}
        maxSize={3 * 1024 ** 2}
        maxFiles={1}
        multiple={false}
      >
        {empty && (
          <>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </>
        )}
        {!empty && preview()}
      </Dropzone>

      <Button fullWidth mt="lg" mb="md">
        Post
      </Button>
    </>
  );
}
