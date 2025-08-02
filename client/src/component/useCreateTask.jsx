import { useState } from "react";
import useUrl from "./useUrl";

let useCreateTask = () => {
  let [error, setError] = useState({});
  let { url } = useUrl();
  let cookie = localStorage.getItem("__toketasjy42562627");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const des = form.des.value;
    const start = form.start.value;
    const end = form.end.value;
    const files = form.documents.files;

    // Set error messages
    setError({
      title: title ? "" : "Give the title",
      des: des ? "" : "Give the description",
      start: start ? "" : "Give the Start Date",
      end: end ? "" : "Give the End Date",
    });

    if (title && des && start && end) {
      // Build form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("des", des);
      formData.append("start", start);
      formData.append("end", end);
      formData.append("haveCookie", cookie ? "true" : "false");
      formData.append("isAuthenticated", cookie);

      // Append files
      if (files.length > 3) {
        setError({ msg: "You can upload up to 3 PDFs only", color: "danger" });
        return;
      }

      for (let i = 0; i < files.length; i++) {
        formData.append("documents", files[i]);
      }

      try {
        const res = await fetch(`${url}/task/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
          body: formData,
        });

        const data = await res.json();
        setError({ msg: data.msg, success: data.success, color: data.color });

        if (data.success) form.reset();
      } catch (err) {
        setError({ msg: "Something went wrong", color: "danger" });
      }
    }
  };

  return { handleSubmit, error };
};

export default useCreateTask;
