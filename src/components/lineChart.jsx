"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

/**
 * D3LineChart Component - Animated line chart with D3.js
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.shouldAnimate - Trigger animation when true
 * @param {Function} props.onAnimationComplete - Callback when animation finishes
 * @param {Object} props.hasChartAnimated - Ref to track if animation has occurred
 */
export default function LineChart({ shouldAnimate, onAnimationComplete }) {
    /* ====== STATEs ==== */
  const svgRef = useRef(null);
  const hasAnimated = useRef(false);

  const data = [
    { x: 40.5, y: 182.5 },
    { x: 102.5, y: 171.5 },
    { x: 165, y: 136.5 },
    { x: 226.5, y: 80.5 },
    { x: 287.5, y: 102.5 },
    { x: 349.5, y: 71.5 },
    { x: 411, y: 80.5 },
    { x: 473.5, y: 54.5 }
  ];

  /* ====== EFFECTS ==== */
  /**
   * Effect to render and animate the line chart
   * Runs when shouldAnimate changes
   */
  useEffect(() => {

    const svg = d3.select(svgRef.current);

    // Clear any existing content
    svg.selectAll('*').remove();

    // Create main group
    const g = svg.append('g').attr('id', 'Group_361');

    // Add white background rectangle
    g.append('rect')
      .attr('id', 'Rectangle_219-2')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('rx', 14)
      .attr('ry', 14)
      .attr('fill', '#ffffff');

    const mainGroup = g.append('g').attr('id', 'Group_360');
    const linesGroup = mainGroup.append('g').attr('id', 'Group_359');

    // Add vertical grid lines
    const gridLines = [
      { id: 'Group_355', lines: [41, 102.7] },
      { id: 'Group_358', lines: [287.8, 349.5] },
      { id: 'Group_356', lines: [164.4, 226.1] },
      { id: 'Group_357', lines: [411.3, 473] }
    ];

    gridLines.forEach(group => {
      const g = linesGroup.append('g').attr('id', group.id);
      group.lines.forEach((x, i) => {
        g.append('path')
          .attr('id', `Path_${i}`)
          .attr('class', 'st3')
          .attr('d', `M${x},59.3v138.1`)
          .attr('stroke', '#707071')
          .attr('stroke-dasharray', '3 3')
          .attr('stroke-width', 0.5)
          .attr('fill', 'none');
      });
    });

    // Add rectangle
    linesGroup.append('rect')
      .attr('id', 'Rectangle_218')
      .attr('class', 'st0')
      .attr('x', 446.7)
      .attr('y', 9.1)
      .attr('width', 52.5)
      .attr('height', 212.9)
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('fill', '#4c6fb6')
      .attr('opacity', 0);

    // Create line path
    const line = d3.line()
      .x(d => d.x)
      .y(d => d.y)


    if(!hasAnimated.current && shouldAnimate) {
        const path = linesGroup.append('path')
            .datum(data)
            .attr('d', line)
            .attr('stroke', '#4c6fb6')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('opacity', 0);

            // Calculate path length for animation
            const totalLength = path.node().getTotalLength();

            // Animate the line
            path
                .attr('opacity', 1)
                .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
                .attr('stroke-dashoffset', totalLength)
                .transition()
                .duration(300)
                .delay(200)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', 0);
                
            // Add circles group
            const circlesGroup = mainGroup.append('g').attr('id', 'Group_365');
        
            // Animate circles
            data.forEach((point, i) => {
                const circle = circlesGroup.append('circle')
                .attr('id', `Ellipse_${17 + i}`)
                .attr('class', 'st4')
                .attr('cx', point.x)
                .attr('cy', point.y)
                .attr('r', 4.5)
                .attr('fill', '#2aaf4a')
                .attr('opacity', 0);
        
                circle
                .transition()
                .duration(200)
                .delay(200 + (i * 50))
                .ease(d3.easeQuadOut)
                .attr('opacity', 1);
            });
    }


    // Call onAnimationComplete after all animations finish
    const totalAnimationTime = 500 + 1000 + (data.length * 100) + 300;
    setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
        hasAnimated.current = true;

      }
    }, totalAnimationTime);

  }, [shouldAnimate, onAnimationComplete]);

  return (
    <svg
      ref={svgRef}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 511 231"
      className="z-10"
    />
  );
}