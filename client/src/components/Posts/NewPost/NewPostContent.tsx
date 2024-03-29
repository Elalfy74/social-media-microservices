import { Button, Text, Image, TextInput, Box, Loader } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm, zodResolver } from '@mantine/form';
import { zfd } from 'zod-form-data';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { z } from 'zod';
import { createPost } from '@/services/posts.service';
import { type CreatePostInput } from '@/types/posts.types';

const preview = (file: FileWithPath) => {
  const imageUrl = URL.createObjectURL(file);
  return <Image src={imageUrl} imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }} />;
};

const schema = zfd.formData({
  title: z.string().min(2, { message: 'Title Must be at least 2 characters' }),
  file: z.array(zfd.file()).optional(),
});

export function NewPostContent({ handleClose }: { handleClose: () => void }) {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      title: '',
      file: [] as FileWithPath[],
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (createPostInput: CreatePostInput) => {
      const formData = new FormData();

      if (createPostInput.file) {
        formData.append('file', createPostInput.file);
      }

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

  const empty = form.values.file.length === 0;

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => mutate({ title: values.title, file: values.file[0] }))}
    >
      <TextInput
        size="md"
        placeholder="Enter a title"
        label="Title"
        withAsterisk
        mb={30}
        {...form.getInputProps('title')}
        data-autofocus
      />
      <Dropzone
        onDrop={(data) => form.setFieldValue('file', data)}
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
        {!empty && preview(form.values.file[0])}
      </Dropzone>

      <Button fullWidth mt="lg" mb="md" type="submit">
        {isLoading ? <Loader variant="dots" color="white" /> : 'Post'}
      </Button>
    </Box>
  );
}
