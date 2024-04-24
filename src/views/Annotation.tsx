import React, { useContext, useState } from 'react';
import AreaInput from '../components/AreaInput';
import ComboInput from '../components/form/LookupInput';
import TextInput from '../components/form/TextInput';
import {
  language,
  pathways,
  gorcElements,
  gorcAttributes,
  interestgroups,
  domains,
  workingGroups,
} from '../data/data';
import { SettingsContext } from '../context/Settings';

interface AnnotationSchema {
  page_url: string;
  uritype: string;
  annotation: string;
  citation: {
    title: string;
    description: string;
    notes: string;
    submitter: string;
    language: {
      id: string;
      label: string;
      value: string;
    };
    created_at: string;
    resource: string;
  };
  vocabularies: {
    pathways: string[];
    gorc_attributes: string[];
    gorc_elements: string[];
    interest_groups: string[];
    working_groups: string[];
    domains: string[];
  };
}

function Annotation({
  tabUrl,
  annotation,
}: Readonly<{
  tabUrl: string;
  annotation: string;
}>) {
  const { settings } = useContext(SettingsContext);
  const [formData, setFormData] = useState<{ [key: string]: any }>();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<'NONE' | 'FAILED' | 'SUCCESS'>('NONE');

  const handleChange = (name: string, value: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    console.log(formData);

    const response = await fetch('http://49.12.1.231:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'wD6nYiHPbsKzHEKrWGXzCxvYBcGbTd',
      },
      body: JSON.stringify({
        page_url: tabUrl,
        uritype: formData?.resource_type.value,
        annotation: formData?.annotation,
        citation: {
          title: formData?.title,
          description: formData?.description,
          notes: formData?.notes,
          submitter: '',
          language: formData?.language,
          created_at: formData?.created_at,
          resource: tabUrl,
        },
        vocabularies: {
          pathways: formData?.pathways,
          gorc_attributes: formData?.gorc_attributes,
          gorc_elements: formData?.gorc_elements,
          interest_groups: formData?.interest_groups,
          working_groups: formData?.working_groups,
          domains: formData?.domains,
        },
      } as AnnotationSchema),
    });
    setSuccess(response.ok ? 'SUCCESS' : 'FAILED');
  };

  const { vocabularies } = settings;
  return (
    <>
      <h2 className="pr-4 text-xl font-bold">Resource Metadata</h2>
      <form className="my-4 space-y-4 pr-[1px]" onSubmit={handleSubmit}>
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
            rounded="middle"
            disabled={submitting}
          />
          <AreaInput
            type="textarea"
            label="Notes"
            onChange={handleChange}
            rounded="bottom"
            disabled={submitting}
          />
        </div>

        <h3 className="text-base font-bold">Administrative</h3>
        <div className="-space-y-px">
          <ComboInput
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
          <ComboInput
            type="lookup"
            label="Resource Type"
            onChange={handleChange}
            required
            rounded="middle"
            dataset={[
              {
                id: 'rda_graph:4F1865F2',
                label: 'Concept',
                value: 'rda_graph:4F1865F2',
                description:
                  'A URI to a page describing a concept (vocabulary item, glossary item, ...)',
              },
              {
                id: 'rda_graph:4D261960',
                label: 'Infrastructure',
                value: 'rda_graph:4D261960',
                description:
                  'A URI to a consortium or national infrastructure for research or digital research services',
              },
              {
                id: 'rda_graph:5DEEF0C7',
                label: 'Initiative',
                value: 'rda_graph:5DEEF0C7',
                description:
                  'A URI to a page describing an initiative, network, federation, or group with a common interest',
              },
              {
                id: 'rda_graph:59F2DD8F',
                label: 'News',
                value: 'rda_graph:59F2DD8F',
                description: 'A URI to a news item',
              },
              {
                id: 'rda_graph:A11C41C',
                label: 'Opinion',
                value: 'rda_graph:A11C41C',
                description:
                  'A URI to a blog post, discussion forum, social media thread, or points of view on a topic',
              },
              {
                id: 'rda_graph:D2BC195C',
                label: 'Organisation',
                value: 'rda_graph:D2BC195C',
                description:
                  'A URI to a page describing an organisation, institution, consortium, or other legal entity, including government entities',
              },
              {
                id: 'rda_graph:BC258428',
                label: 'Other',
                value: 'rda_graph:BC258428',
                description: 'Any other resource in the web',
              },
              {
                id: 'rda_graph: 4D261960',
                label: 'Project',
                value: 'rda_graph: 4D261960',
                description: 'A URI to a project or programme',
              },
              {
                id: 'rda_graph:51B3E91F',
                label: 'Publication',
                value: 'rda_graph:51B3E91F',
                description:
                  'Any of a number of sub-categories, as defined by info_types and used in Zenodo',
              },
              {
                id: 'rda_graph:6951DB96',
                label: 'Recommendation',
                value: 'rda_graph:6951DB96',
                description:
                  'A URI to a recommendation in respect of standards, best practices, or similar',
              },
              {
                id: 'rda_graph:9D161303',
                label: 'Requirements',
                value: 'rda_graph:9D161303',
                description:
                  'A URI to requirements or community expectations in respect of performance, benchmarks, and norms',
              },
              {
                id: 'rda_graph:FB3739CC',
                label: 'Service',
                value: 'rda_graph:FB3739CC',
                description:
                  'A URI to a service, registry, repository, archive, or API that can assist with RDMI workflows, ir serves as an example',
              },
              {
                id: 'rda_graph:FF51944E',
                label: 'Specification',
                value: 'rda_graph:FF51944E',
                description: 'A URI to a specification or standard',
              },
            ]}
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
          {vocabularies.pathways && (
            <ComboInput
              type="lookup"
              label="Pathways"
              onChange={handleChange}
              rounded="top"
              dataset={pathways.map((pathway, index) => ({
                id: `${index}`,
                label: pathway.tags,
                description: pathway.pathway,
                value: pathway.tags,
              }))}
              multiple
              disabled={submitting}
            />
          )}
          {vocabularies.gorcAttributes && (
            <ComboInput
              type="lookup"
              label="GORC Attributes"
              onChange={handleChange}
              rounded="middle"
              dataset={gorcAttributes.map((attributes, index) => ({
                id: `${index}`,
                label: attributes.attribute,
                value: attributes.attribute,
                description: attributes.tags,
              }))}
              multiple
              disabled={submitting}
            />
          )}
          {vocabularies.gorcElements && (
            <ComboInput
              type="lookup"
              label="GORC Elements"
              onChange={handleChange}
              rounded="middle"
              dataset={gorcElements.map((elements, index) => ({
                id: `${index}`,
                label: elements.element,
                value: elements.element,
                description: elements.tags,
              }))}
              multiple
              disabled={submitting}
            />
          )}
          {vocabularies.interestGroups && (
            <ComboInput
              type="lookup"
              label="Interest Groups"
              onChange={handleChange}
              rounded="middle"
              dataset={interestgroups.map((interestGroup) => ({
                id: interestGroup.uuid_interestgroup,
                label: interestGroup.title,
                value: interestGroup.uuid_interestgroup,
                description: interestGroup.description,
                url: interestGroup.url,
              }))}
              multiple
              disabled={submitting}
            />
          )}
          {vocabularies.workingGroups && (
            <ComboInput
              type="lookup"
              label="Working Groups"
              onChange={handleChange}
              rounded="middle"
              dataset={workingGroups.map((workingGroup) => ({
                id: workingGroup.g_UUID,
                label: workingGroup.Title,
                value: workingGroup.g_UUID,
              }))}
              multiple
              disabled={submitting}
            />
          )}
          {vocabularies.domain && (
            <ComboInput
              type="lookup"
              label="Domains"
              onChange={handleChange}
              rounded="bottom"
              dataset={domains.map((domain) => ({
                id: domain.uuid,
                label: domain.domain,
                value: domain.uuid,
              }))}
              multiple
              disabled={submitting}
            />
          )}
        </div>

        <button
          type="submit"
          // disabled={
          //   submitting ||
          //   settings.customHypothesisKey === "" ||
          //   settings.useCustomHypothesisKey === false ||
          //   settings.mirrorHypothesis === false
          // }
          disabled={submitting}
          className="w-full rounded-md bg-rda-500 px-4 py-2 text-xl font-bold text-white hover:bg-rda-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-rda-500"
        >
          {success === 'NONE'
            ? submitting
              ? 'Submited'
              : 'Submit'
            : success === 'SUCCESS'
              ? 'Successfully Annotated'
              : 'Failed to Annotate'}
        </button>
      </form>
    </>
  );
}

export default Annotation;
