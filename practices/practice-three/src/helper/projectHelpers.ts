import type { IProjectItemProps } from '@/components/ProjectItem';

type SearchField = keyof IProjectItemProps;

/**
 * Helper function to filter projects by a keyword across a specified field.
 *
 * @param projects - The list of original project items
 * @param keyword - The search keyword to filter projects
 * @param field - The field to search the keyword within
 *
 * @returns An object with filtered data based on the keyword and field
 */
export const filterProjectsByField = (projects: IProjectItemProps[], keyword: string, field: SearchField) => {
  if (!keyword.trim()) {
    return projects;
  }

  const lowercasedKeyword = keyword.toLowerCase();

  const filteredData = projects.filter((project) => {
    const fieldValue = project[field];

    if (typeof fieldValue !== 'string') {
      return false;
    }

    return fieldValue.toLowerCase().includes(lowercasedKeyword);
  });

  return filteredData;
};
