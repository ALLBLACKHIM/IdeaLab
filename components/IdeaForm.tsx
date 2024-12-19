"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const IdeaForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [article, setArticle] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        article,
      };

      await formSchema.parseAsync(formValues);
      console.log(formValues);

      // const result = await createIdea(prevState, formData, article);

      // console.log(result);
      
      // if(result.status === "SUCCESS"){
      //   toast({
      //     title: "Error",
      //     description: "Your Idea Article has been created successfully",
      //   });

      //   router.push(`/idea/${result.id}`);
      // }

      // return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = error.flatten();

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check the form fields for errors",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error occurred while submitting the form",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="idea-form">
      <div>
        <label htmlFor="title" className="idea-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="idea-form_input"
          required
          placeholder="Idea's Title"
        />

        {errors.title && <p className="idea-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="idea-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="idea-form_textarea"
          required
          placeholder="Idea's Description"
        />

        {errors.description && (
          <p className="idea-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="idea-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="idea-form_input"
          required
          placeholder="Idea's category (eg. Games, Pixel, Art)"
        />

        {errors.category && (
          <p className="idea-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="idea-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="idea-form_input"
          required
          placeholder="Idea's Image URL"
        />

        {errors.link && <p className="idea-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="article" className="idea-form_label">
          Article
        </label>

        <MDEditor
          value={article}
          onChange={(value) => setArticle(value as string)}
          id="article"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Write your article on any aspect on a game",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.article && <p className="idea-form_error">{errors.article}</p>}
      </div>

      <Button
        type="submit"
        className="idea-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? `Submitting...` : `Submit your Article`}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default IdeaForm;
