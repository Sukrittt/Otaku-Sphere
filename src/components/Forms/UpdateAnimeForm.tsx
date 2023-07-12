"use client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Anime } from "@prisma/client";

import { genres } from "@/data/anime";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Textarea } from "@/ui/Textarea";
import { Icons } from "@/components/Icons";
import {
  type AnimeSchemaType,
  animeSchema,
  IdAnimeSchemaType,
} from "@/lib/validators/anime";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { Combobox } from "@/ui/ComboBox";
import { uploadFiles } from "@/lib/uploadthing";
import { useAuthToast } from "@/hooks/useAuthToast";
import CustomAlertBox from "@/components/CustomAlertBox";

interface UpdateAnimeFormProps {
  anime: Anime;
}

const UpdateAnimeForm: FC<UpdateAnimeFormProps> = ({ anime }) => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useAuthToast();

  const [file, setFile] = useState<File | null>(null);
  const [genre, setGenre] = useState(anime.genre);

  //react-hook-form initialization
  const form = useForm<AnimeSchemaType>({
    resolver: zodResolver(animeSchema),
    defaultValues: {
      name: anime.name,
      description: anime.description,
      director: anime.director,
      genre: anime.genre,
      releaseYear: anime.releaseYear,
      trailerLink: anime.trailerLink,
    },
  });

  const { mutate: updateAnime, isLoading } = useMutation({
    mutationFn: async (content: AnimeSchemaType) => {
      let fileUrl = anime.coverImage ?? null;

      if (file) {
        const { url } = await uploadByFile(file);
        fileUrl = url;
      }

      const payload = { ...content, genre, coverImage: fileUrl, id: anime.id };

      const { data } = await axios.patch("/api/anime", payload);
      return data;
    },
    onSuccess: () => {
      router.push("/admin/anime");
      router.refresh();
      form.reset();

      toast({
        description: "This anime was updated successfully.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 403) {
          return toast({
            title: "Error",
            description: "You are not authorized to add anime.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            title: "Error",
            description: "This anime already exists.",
            variant: "destructive",
          });
        }
        if (statusCode === 400) {
          return toast({
            title: "Error",
            description: "Cover image is missing.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
  });

  const { mutate: deleteAnime, isLoading: deleteLoader } = useMutation({
    mutationFn: async () => {
      const payload: IdAnimeSchemaType = { id: anime.id };

      const { data } = await axios.post("/api/anime/delete", payload);
      return data;
    },
    onSuccess: () => {
      router.push("/admin/anime");
      router.refresh();
      form.reset();

      toast({
        title: "Anime deleted",
        description: "The anime was deleted successfully.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 403) {
          return toast({
            title: "Error",
            description: "You are not authorized to delete anime.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
  });

  async function uploadByFile(file: File) {
    // upload to uploadthing

    const [res] = await uploadFiles({
      endpoint: "imageUploader",
      files: [file],
    });

    return {
      url: res.fileUrl,
    };
  }

  function onSubmit(content: AnimeSchemaType) {
    updateAnime(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type anime name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type anime description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="director"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Director</FormLabel>
              <FormControl>
                <Input placeholder="Type anime director here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={() => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Combobox
                  data={genres}
                  placeholder="Select genre..."
                  selectedOption={genre}
                  setState={setGenre}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release year</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type release year of anime here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trailerLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trailor Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter a trailer link." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <FileInput
                  setFile={setFile}
                  placeholder="Enter a trailer link."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-3 items-center">
          <Button className="w-fit" disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Update Anime
            <span className="sr-only">Update Anime</span>
          </Button>
          <CustomAlertBox
            description="This action cannot be undone. This will permanently delete this anime from our servers."
            onClick={() => deleteAnime()}
          >
            <Button
              className="w-fit"
              disabled={deleteLoader}
              variant="destructive"
              type="button"
            >
              {deleteLoader && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              {deleteLoader ? "Deleting" : "Delete Anime"}
              <span className="sr-only">Delete Anime</span>
            </Button>
          </CustomAlertBox>
        </div>
      </form>
    </Form>
  );
};

export default UpdateAnimeForm;

const FileInput = ({
  setFile,
  placeholder,
}: {
  setFile: (file: File | null) => void;
  placeholder: string;
}) => {
  return (
    <input
      type="file"
      placeholder={placeholder}
      onChange={(e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          setFile(selectedFile);
        }
      }}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      accept="image/*"
    />
  );
};
