import React, { useState } from "react";
import AreaInput from "../components/AreaInput";
import LookupInput from "../components/form/LookupInput";
import TextInput from "../components/form/TextInput";
import {
  language,
  pathways,
  gorc,
  interestgroups,
  domains,
} from "../data/data";

function Annotation({
  tabUrl,
  annotation,
}: Readonly<{
  tabUrl: string;
  annotation: string;
}>) {
  const [formData, setFormData] = useState<{ [key: string]: any }>();
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const response = await fetch("https://api.hypothes.is/api/annotations", {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.hypothesis.v1+json",
        Authorization: `Bearer ${formData!.hypothesis_api_key}`,
      },
      body: JSON.stringify({
        uri: tabUrl,
        document: {
          title: formData?.title,
        },
        text: formData?.annotation,
      }),
    });
    console.log(response);
  };
  return (
    <>
      <h2 className="pr-4 text-xl font-bold">Resource Metadata</h2>
      <form className="my-4 space-y-4 pr-[1px]" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          label="Hypothesis API KEY"
          onChange={handleChange}
          required
          disabled={submitting}
        />
        <AreaInput
          type="textarea"
          label="Annotation"
          value={annotation}
          onChange={handleChange}
          required
          disabled
          rows={6}
        />

        <h3 className="text-base font-bold">Citation</h3>
        <div className="-space-y-px">
          <TextInput
            type="text"
            label="Title"
            onChange={handleChange}
            required
            rounded="top"
            disabled={submitting}
          />
          <AreaInput
            type="textarea"
            label="Description"
            onChange={handleChange}
            rounded="bottom"
            disabled={submitting}
          />
        </div>

        <h3 className="text-base font-bold">Administrative</h3>
        <div className="-space-y-px">
          <LookupInput
            type="lookup"
            label="Language"
            onChange={handleChange}
            required
            rounded="top"
            dataset={language.map((l, i) => ({
              id: `${i}`,
              label: l.label,
              value: l.value,
            }))}
            disabled={submitting}
          />
          <TextInput
            type="text"
            label="Resource"
            value={tabUrl}
            onChange={handleChange}
            required
            disabled
            rounded="middle"
          />
          <TextInput
            type="date"
            label="Created At"
            value={currentDate}
            onChange={handleChange}
            required
            disabled
            rounded="bottom"
          />
        </div>

        <h3 className="text-base font-bold">Coverage</h3>
        <div className="-space-y-px">
          <LookupInput
            type="lookup"
            label="Pathways"
            onChange={handleChange}
            rounded="top"
            dataset={pathways.map((p) => ({
              id: p.id,
              label: p.title,
              value: p.id,
            }))}
            multiple
            disabled={submitting}
          />
          <LookupInput
            type="lookup"
            label="GORC"
            onChange={handleChange}
            rounded="middle"
            dataset={gorc.map((g) => ({
              id: g.id,
              label: g.title,
              value: g.id,
            }))}
            multiple
            disabled={submitting}
          />
          <LookupInput
            type="lookup"
            label="Origin"
            onChange={handleChange}
            rounded="middle"
            dataset={interestgroups.map((ig) => ({
              id: ig.id,
              label: ig.title,
              value: ig.id,
            }))}
            multiple
            disabled={submitting}
          />
          <LookupInput
            type="lookup"
            label="Domain"
            onChange={handleChange}
            rounded="bottom"
            dataset={domains.map((d) => ({
              id: d.id,
              label: d.title,
              value: d.id,
            }))}
            multiple
            disabled={submitting}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-rda-500 text-white font-bold px-4 py-2 rounded-md w-full hover:bg-rda-400 disabled:hover:bg-rda-500 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submited" : "Submit"}
        </button>
      </form>
    </>
  );
}

export default Annotation;
