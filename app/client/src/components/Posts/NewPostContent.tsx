import { useRef, useState } from 'react';
import { Button, Text, Image, TextInput, Box, Loader } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '@/services/posts';
import { type CreatePostInput } from '@/types/posts';

const preview = (file: FileWithPath) => {
  const imageUrl = URL.createObjectURL(file);
  return <Image src={imageUrl} imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }} />;
};

const schema = z.object({
  title: z.string().min(2, { message: 'Title Must be at least 2 characters' }),
});

export function NewPostContent({ handleClose }: { handleClose: () => void }) {
  const [files, setFile] = useState<FileWithPath[]>([]);
  const openRef = useRef<() => void>(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (createPostInput: CreatePostInput) => {
      const formData = new FormData();

      formData.append('file', files[0]);
      formData.append('title', createPostInput.title);

      return createPost(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      handleClose();
    },
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      title: '',
    },
  });

  const empty = files.length === 0;

  return (
    <Box component="form" onSubmit={form.onSubmit((values) => mutate(values))}>
      <TextInput
        autoFocus
        size="md"
        placeholder="Enter a title"
        label="Title"
        withAsterisk
        mb={30}
        {...form.getInputProps('title')}
      />
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
        {!empty && preview(files[0])}
      </Dropzone>

      <Button fullWidth mt="lg" mb="md" type="submit">
        {isLoading ? <Loader variant="dots" color="white" /> : 'Post'}
      </Button>
    </Box>
  );
}
