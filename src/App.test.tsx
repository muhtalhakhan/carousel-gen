import React from 'react'

import App from './App'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  it('renders App component', async () => {
    render(<App />)
    expect(screen.getByText('Carousel Gen')).toBeInTheDocument()

    // Check for inputs
    expect(screen.getByLabelText('Background Color')).toBeInTheDocument()
    expect(screen.getByLabelText('Content')).toBeInTheDocument()
    expect(screen.getByText('No image selected')).toBeInTheDocument()
    expect(screen.getByLabelText('Content Color')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()

    // Wait for fonts to load and then check for font family input
    expect(await screen.findByLabelText('Font Family')).toBeInTheDocument()
  })

  it('should update background color', async () => {
    render(<App />)
    const color = '#f2f'

    // Type in color.
    // Cross check if the color is updated.
    await act(async () => {
      userEvent.type(screen.getByLabelText('Background Color'), color)
    })
    expect(await screen.findByLabelText('Background Color')).toHaveValue(color)
    expect(await screen.findByLabelText('carousel')).toHaveStyle({
      backgroundColor: color,
    })

    // Type in invalid color.
    // Check for invalid helper text.
    await act(async () => {
      userEvent.type(screen.getByLabelText('Background Color'), 'invalid')
    })
    expect(await screen.findByText('Invalid color')).toBeInTheDocument()

    // Clear the input.
    // Check if the carousel has the default background color
    await act(async () => {
      userEvent.clear(screen.getByLabelText('Background Color'))
    })
    expect(await screen.findByLabelText('Background Color')).toHaveValue('')
    expect(await screen.findByLabelText('carousel')).toHaveStyle({
      backgroundColor: '#000',
    })
  })

  it('should update and clear content', async () => {
    render(<App />)
    const content = 'Some content here'

    // Type in content.
    // Cross check if the content is updated.
    await act(async () => {
      userEvent.type(screen.getByLabelText('Content'), content)
    })
    expect(await screen.findByLabelText('Content')).toHaveValue(content)
    expect(await screen.findByLabelText('carousel-content')).toHaveTextContent(
      content,
    )

    // Clear the content using the clear button.
    // Check if the carousel-content is empty.
    await act(async () => {
      userEvent.click(screen.getByLabelText('Clear content'))
    })
    expect(await screen.findByLabelText('Content')).toHaveValue('')
    expect(
      await screen.findByLabelText('carousel-content'),
    ).toBeEmptyDOMElement()
  })

  it('should update content color', async () => {
    render(<App />)
    const color = '#f2f'

    // Type in color.
    // Cross check if the color is updated.
    await act(async () => {
      userEvent.type(screen.getByLabelText('Content Color'), color)
    })
    expect(await screen.findByLabelText('Content Color')).toHaveValue(color)
    expect(await screen.findByLabelText('carousel-content')).toHaveStyle({
      color: color,
    })

    // Type in invalid color.
    // Check for invalid helper text.
    await act(async () => {
      userEvent.type(screen.getByLabelText('Content Color'), 'invalid')
    })
    expect(await screen.findByText('Invalid color')).toBeInTheDocument()

    // Clear the input.
    // Check if the carousel has the default content color
    await act(async () => {
      userEvent.clear(screen.getByLabelText('Content Color'))
    })
    expect(await screen.findByLabelText('Content Color')).toHaveValue('')
    expect(await screen.findByLabelText('carousel-content')).toHaveStyle({
      color: '#fff',
    })
  })

  it('should update and clear name', async () => {
    render(<App />)
    const name = 'John Doe'

    // Type in name.
    // Cross check if the name is updated.
    await act(async () => {
      userEvent.type(screen.getByLabelText('Name'), name)
    })
    expect(await screen.findByLabelText('Name')).toHaveValue(name)
    expect(await screen.findByLabelText('carousel-name')).toHaveTextContent(
      name,
    )

    // Clear the name using the clear button.
    // Check if the carousel-name element is removed.
    await act(async () => {
      userEvent.click(screen.getByLabelText('Clear name'))
    })
    expect(await screen.findByLabelText('Name')).toHaveValue('')
    expect(screen.queryByLabelText('carousel-name')).not.toBeInTheDocument()
  })

  it('should upload and remove profile image', async () => {
    render(<App />)

    // Upload image.
    // Check if the image is uploaded and the name is displayed.
    // Check if the image is visible in the carousel.
    const file = new File(['Profile image'], 'profile.png', {
      type: 'image/png',
    })
    await act(async () => {
      userEvent.upload(screen.getByLabelText('Profile Image'), file)
    })
    expect(await screen.findByText('profile.png')).toBeInTheDocument()
    expect(
      await screen.findByLabelText('carousel-profile-image'),
    ).toBeInTheDocument()

    // Remove image by clicking on the remove button.
    // Check if the image is removed.
    await act(async () => {
      userEvent.click(screen.getByLabelText('Clear profile image'))
    })
    expect(await screen.findByText('No image selected')).toBeInTheDocument()
    expect(
      screen.queryByLabelText('carousel-profile-image'),
    ).not.toBeInTheDocument()
  })
})
